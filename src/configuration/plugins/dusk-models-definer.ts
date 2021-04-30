import Dusk from '@xams-framework/dusk';


export default function defineModels(options?: any) {
    return () => {
        return {
            name: 'dusk-models-definer',

            onReady(ctx: Dusk, next) {
                (options.models || []).forEach((model) => {
                    ctx.define(model);
                });
                next();
            }
        };
    };
};
