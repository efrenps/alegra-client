import React from 'react';
import ReactTable from 'react-table';
import {
    Container
} from 'react-bootstrap';
import { Spin } from 'antd';
import TableUtils from '../utils/TableUtils';
import { withStyles } from '@material-ui/core/styles';

// Styles
import 'react-table/react-table.css';
import '../styles/theme/table.less';

import PropTypes from 'prop-types';
import { map, isEmpty, lowerCase, pull } from 'lodash';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Table extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns,
            desc: true,
            isExpanded: false,
            keyTable: `key${TableUtils.generateUUID()}`,
        };

        this.initBind();
    }

    initBind() {
        this.loadMoreData = this.loadMoreData.bind(this);
        this.onSortedChange = this.onSortedChange.bind(this);
        this.toggleExpandAll = this.toggleExpandAll.bind(this);
    }

    static propTypes = {
        loadMore: PropTypes.func,
        sortedChange: PropTypes.func,
        className: PropTypes.string,
        data: PropTypes.array,
        columns: PropTypes.array,
        totalRecords: PropTypes.number,
        rowSelected: PropTypes.bool,
        containerClassName: PropTypes.string,
        settings: PropTypes.object,
        isDraggable: PropTypes.bool,
        collapseAll: PropTypes.bool,
    };

    static get defaultProps() {
        return {
            load: false,
            data: [],
            defaultPageSize: 5000,
            minRows: 0,
            showPagination: false,
            multiSort: false,
            sortable: true,
            alignElementsRow: 'center',
            rowSelected: false,
            border: true,
            cursor: 'pointer',
            settings: {},
            isDraggable: false,
            collapseAll: false,
        };
    }

    componentDidUpdate(prevProps) {
        const {
            props: {
                rowSelected,
                collapseAll,
                loadMore,
                className,
                totalRecords,
                data,
                load,
            },
            state: { keyTable },
        } = this;

        if (loadMore) {
            const id = className;
            const querySelector = id
                ? `.${id} .rt-tbody`
                : `#${keyTable} .rt-tbody`;
            const element = document.querySelector(querySelector);

            if (element) {
                const footerLoading = document.querySelector(
                    `#footer-loading.${keyTable}`,
                );

                if (footerLoading) {
                    if (load && data.length < totalRecords) {
                        element.append(footerLoading);
                        footerLoading.style.display = 'block';
                    } else {
                        footerLoading.style.display = 'none';
                    }
                }
            }
        }

        if (rowSelected) {
            document
                .querySelectorAll('.rt-tbody .rt-tr')
                .addEvent('click', function() {
                    const elementActive = this.parentNode.parentNode.querySelector(
                        '.rt-tr.active',
                    );

                    if (elementActive) {
                        elementActive.classList.remove('active');
                    }

                    this.classList.add('active');
                });
        }

        if (
            typeof collapseAll === 'boolean' &&
            prevProps.collapseAll !== collapseAll
        ) {
            this.toggleExpandAll(collapseAll);
        }
    }

    componentDidMount() {
        const { props, state } = this;
        const { keyTable } = state;

        if (props.loadMore) {
            const id = props.className;
            const querySelector = id
                ? `.${id} .rt-tbody`
                : `#${keyTable} .rt-tbody`;
            const element = document.querySelector(querySelector);

            element.addEventListener('scroll', () => {
                const { props } = this;
                const { data, totalRecords, load } = props;

                if (
                    element.offsetHeight + element.scrollTop >=
                    element.scrollHeight
                ) {
                    if (data.length < totalRecords) {
                        if (!load) {
                            this.loadMoreData();
                        }
                    }
                }
            });
        }
    }


    loadMoreData() {
        const { props } = this;

        props.loadMore();
    }

    getClass() {
        const { props } = this;
        const {
            minHeightRow,
            alignElementsRow,
            className,
            border,
            sortable,
            loadMore,
            cursor,
        } = props;
        let classMinHeightRow = '',
            classAlignElementsRow = '',
            customClassName = '',
            classBorderTable = '',
            classSortable = '',
            classCursor = '';

        classMinHeightRow =
            !TableUtils.isEmpty(minHeightRow) && minHeightRow < 7 && minHeightRow > 0
                ? `rt-min-hb-${minHeightRow}`
                : '';
        classAlignElementsRow = TableUtils.isEmpty(alignElementsRow)
            ? ''
            : alignElementsRow;
        customClassName = TableUtils.isEmpty(className) ? '' : className;
        classBorderTable = border ? '' : 'rt-table-expandable';
        classSortable =
            (!loadMore && !sortable) || (loadMore && !sortable)
                ? 'no-sort-table'
                : '';
        classCursor =
            cursor === 'pointer'
                ? 'rt-cursor-pointer'
                : cursor === 'default'
                ? 'rt-cursor-default'
                : '';

        return `${classMinHeightRow} ${classAlignElementsRow} ${customClassName} ${classBorderTable} ${classSortable} ${classCursor}`;
    }

    onSortedChange(newSorted, column) {
        const { props, state } = this;
        const columnName = column.id;
        const columns = state.columns;

        for (const item of columns) {
            if (item.id === columnName) {
                item.headerClassName = !state.desc ? '-sort-asc' : '-sort-desc';
            } else {
                item.headerClassName = !item.headerClassName
                    ? ''
                    : !item.sortable &&
                      !item.headerClassName.includes('no-sort')
                    ? ''
                    : item.headerClassName;
            }
        }

        this.setState(
            prevState => ({ desc: !prevState.desc }),
            () => {
                if (props.sortedChange) {
                    props.sortedChange(columnName, state.desc);
                }
            },
        );
    }

    toggleExpandAll(isExpanded = false) {
        const table = this.table || {};
        const tableState = table.state || {};
        const rowCount = tableState.data.length;
        const expanded = [];

        if (isExpanded) {
            for (let i = 0; i <= rowCount; i++)
                expanded.push({ [i]: isExpanded });
        }

        table.setState({ expanded: expanded });
        this.setState({ isExpanded: isExpanded });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { state } = this;
        const columns = Object.assign(nextProps.columns, state.columns);

        this.setState({ columns });
    }

    sortByArray(records, orderBy) {
        let newRecords = orderBy.map(item =>
            records.find(record => {
                if (!isEmpty(record)) {
                    if (typeof record.accessor === 'string') {
                        return (
                            lowerCase(record.accessor) === lowerCase(item.id)
                        );
                    } else if (typeof record.id === 'string') {
                        return lowerCase(record.id) === lowerCase(item.id);
                    }
                }

                return null;
            }),
        );

        newRecords = pull(newRecords, null);

        return newRecords;
    }

    getDraggableColumns(columns = [], toSave = false) {
        const draggableColumns = columns.map(item => {
            if (typeof item.accessor === 'string') {
                return {
                    id: item.accessor,
                };
            } else if (typeof item.id === 'string') {
                return {
                    id: item.id,
                };
            }

            return {};
        });

        if (!toSave) {
            return map(draggableColumns, 'id');
        }

        return draggableColumns;
    }

    renderReactTable(tableStyle, isSortable) {
        const { props, state } = this;

        return (
            <ReactTable
                ref={t => (this.table = t)}
                style={tableStyle}
                defaultPageSize={props.defaultPageSize}
                minRows={props.minRows}
                showPagination={props.showPagination}
                noDataText={props.load ? '' : 'No rows found'}
                loading={props.data.length > 0 ? false : props.load}
                multiSort={props.multiSort}
                onSortedChange={
                    props.loadMore
                        ? (newSorted, column) => {
                              this.onSortedChange(newSorted, column);
                          }
                        : null
                }
                {...props}
                className={this.getClass()}
                sortable={isSortable}
                columns={state.columns}
            />
        );
    }

    renderTable(_isDraggable, tableStyle, isSortable) {
        return this.renderReactTable(tableStyle, isSortable);
    }

    render() {
        const { props, state } = this;
        const tableStyle = {
            flex: '1',
            height: '100%',
            width: '100%',
            cursor: props.cursor,
        };
        const footerStyle = {
            background: '#F5F5F5',
            border: '1px solid rgba(0,0,0,0.1)',
            borderTop: '0',
            display: 'block',
        };
        const loadingStyle = {
            alignItems: 'center',
            display: 'flex',
            height: '40px',
            justifyContent: 'center',
        };
        const { sortable, loadMore, containerClassName, isDraggable } = props;
        const { keyTable } = state;
        const loadingElement = document.querySelector(
            `#footer-loading.${keyTable}`,
        );
        let isSortable = true;

        if ((!loadMore && !sortable) || (loadMore && !sortable)) {
            isSortable = false;
        }
        const containerClass = TableUtils.isEmpty(containerClassName)
            ? ''
            : containerClassName;

        return (
            <Container
                id={keyTable}
                className={`table-selected ${containerClass}`}
                overflow={false}
                region="center"
                style={{ height: '100%', flex: '1' }}
            >
                {this.renderTable(isDraggable, tableStyle, isSortable)}
                {props.loadMore && props.load && !loadingElement && (
                    <div>
                        <div
                            id="footer-loading"
                            className={keyTable}
                            style={footerStyle}
                        >
                            <div style={loadingStyle}>
                                <Spin />
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        );
    }
}

const component = withStyles(styles)(Table);
export { component as Table };
