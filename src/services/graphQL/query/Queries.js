import { gql } from '@apollo/client';

export default class Queries {
    static GET_MENUS = gql`
        query getMenus {
            getMenus {
                menuId
                name
                ingredients {
                    name,
                    ingredientId
                    quantity
                }
            }
        }
    `;

    static GET_MENU_ORDERS = gql`
        query getMenuOrders ($filter: MenuOrderFilter, $paginate: Paginate, $sort: Sort){
            getMenuOrders (filter: $filter, paginate: $paginate, sort: $sort){
                menuOrderId
                menuId,
                status,
                quantity,
                createdAt
                menu {
                    menuId
                    name,
                }
            }
        }
    `;

    static PRODUCT_VENDOR_DETAIL = gql`
        query getProductVendor($productId: Int!) {
            getProductVendor(productId: $productId) {
                productId
                vendorId
                vendorName
                productName
                productPackage
                productType
                productActive
                imported
            }
        }
    `;
}
