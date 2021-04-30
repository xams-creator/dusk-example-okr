import Dusk from '@xams-framework/dusk';

const model = {
    namespace: '@@xams/loading',
    state: {
        loading: false
    },
    scoped: {
        reducers: {
            start() {
                return {
                    loading: true
                };
            },
            stop() {
                return {
                    loading: false
                };
            },
            setLoading(state, {loading}) {
                return {
                    loading
                };
            }
        }
    },
    subscribe(oldValue, newValue) {
        console.log(this);
        console.log('@@xams/loading 值已发生更新', newValue);

    }
};


export default function createLoading(options?: any) {
    return () => {
        return {
            name: 'dusk-loading',
            onReady(ctx: Dusk, next) {
                ctx.define(model);
                next();
            }
        };
    };
};
