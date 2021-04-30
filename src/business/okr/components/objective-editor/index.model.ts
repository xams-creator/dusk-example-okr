export default {
    namespace: 'okr/objective/drawer',
    state: {
        visible: false,
        initialValues: {},
    },
    scoped: {
        reducers: {
            open(state) {
                return {
                    ...state,
                    visible: true,
                };
            },
            close(state) {
                return {
                    ...state,
                    visible: false
                };
            },
            edit(state, {payload}) {
                return {
                    visible: true,
                    initialValues: payload
                };
            }
        }
    },
    actions: {
        open(cb?) {
            console.log(this);
            return (dispatch) => {
                dispatch({
                    type: 'okr/objective/drawer/open'
                });
                cb && cb()
            };
        },
        close() {
            return (dispatch) => {
                dispatch({
                    type: 'okr/objective/drawer/close'
                });
            };
        }
    }
};
