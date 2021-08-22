import { ADD_COUNTER, ADD_TO_CART } from './mutation-types';
export default {
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        // 添加名为 checked 的新属性，判断是否选中
        payload.checked = true;
        state.cartList.push(payload);
    }
}
