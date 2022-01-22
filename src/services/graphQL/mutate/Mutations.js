import { gql } from '@apollo/client';

export default class Mutations {
    static CREATE_MENU_ORDER = gql`
        mutation createMenuOrder {
            createMenuOrder
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
