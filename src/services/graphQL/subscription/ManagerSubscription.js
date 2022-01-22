import { gql } from '@apollo/client';

export default class ProductsSubscription {
    static PRODUCT_VENDOR_LIST = gql`
        subscription productVendorList($searchTerm: String, $status: Boolean) {
            productVendorList(searchTerm: $searchTerm, status: $status) {
                type
                product: data {
                    productId
                    vendorId
                    vendorName
                    productName
                    productPackage
                    productType
                    productActive
                }
            }
        }
    `;

    static MENU_ORDERS = gql`
        subscription menuOrders {
            menuOrders {
                type
                menuOrder: data {
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
        }
    `;
}
