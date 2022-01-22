import { gql } from '@apollo/client';

export default class Mutations {
    static CREATE_MENU_ORDER = gql`
        mutation createMenuOrder {
            createMenuOrder
        }
    `;

    static ASSING_MENU_IN_ORDER = gql`
        mutation assingMenuInOrder(
            $menuOrderId: Int!
            $menuId: Int!
        ) {
            assingMenuInOrder(menuOrderId: $menuOrderId, menuId: $menuId)
        }
    `;

    static CREATE_PRODUCT_VENDOR = gql`
        mutation addProduct($input: ProductInput) {
            addProduct(input: $input){
                productId
            }
        }
    `;

    static UPDATE_PRODUCT_VENDOR = gql`
        mutation updateProduct(
            $id: Int!
            $input: ProductInput
        ) {
            updateProduct(id: $id, input: $input){
                productId
            }
        }
    `;
}
