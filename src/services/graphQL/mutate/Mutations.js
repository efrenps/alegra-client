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

    static UPDATE_MENU_ORDER_STATUS = gql`
        mutation updateMenuOrderStatus(
            $menuOrderId: Int!
        ) {
            updateMenuOrderStatus(menuOrderId: $menuOrderId)
        }
    `;

    static BUY_INGREDIENT = gql`
        mutation buyIngredient(
            $ingredientId: Int!
        ) {
            buyIngredient(ingredientId: $ingredientId)
        }
    `;
}
