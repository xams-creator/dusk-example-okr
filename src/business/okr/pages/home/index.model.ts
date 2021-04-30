import vm from './index.view.json';
import {remove} from '@xams-framework/dusk';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';

export function genCreatedTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

export function getObjetiveProgress(details,) {
    let progress = 0;
    details.forEach((detail) => {
        progress += detail.progress;
    });
    if (progress === 0) {
        return 0;
    }
    return Math.round(progress / (details.length * 100) * 100);
}

export default {
    namespace: 'okr/home',
    state: {
        objectives: vm.data.objectives
    },
    scoped: {
        reducers: {
            init(state) {
                return {
                    ...state,
                    objectives: [...vm.data.objectives]
                };
            },
            sort(state, {payload}) {
                const type = !payload[0].objective_id ? 'sort' : 'sort-detail';

                switch (type) {
                    case 'sort':
                        return {
                            ...state,
                            objectives: [...payload]
                        };
                    default:
                        const pid = payload[0].objective_id;
                        const objective = state.objectives.find((item) => item.id === pid);
                        objective.children = payload;
                        return {
                            ...state,
                            objectives: [...state.objectives]
                        };
                }
            },
            create(state, {payload}) {
                payload.id = `objective-${uuidv4()}`;
                payload.index = state.objectives.length + 1;
                payload.created_time = genCreatedTime();
                payload.children.forEach((detail, index) => {
                    detail.id = `kr-${uuidv4()}`;
                    detail.index = index + 1;
                    detail.objective_id = payload.id;
                    detail.created_time = genCreatedTime();
                });
                payload.progress = getObjetiveProgress(payload.children);
                return {
                    ...state,
                    objectives: [...state.objectives, payload]
                };
            },
            update(state, {payload}) {

                payload.children.forEach((detail, index) => {
                    if (!detail.id) {
                        detail.id = `kr-${uuidv4()}`;
                        detail.index = index + 1;
                        detail.objective_id = payload.id;
                        detail.created_time = genCreatedTime();
                    }
                });

                state.objectives.forEach((item, index) => {
                    if (item.id === payload.id) {
                        payload.progress = getObjetiveProgress(payload.children);
                        payload.children = [...payload.children];
                        state.objectives[index] = payload;
                    }
                });

                return {
                    ...state,
                    objectives: [...state.objectives]
                };
            },
            query(state, {payload}) {
                const id = payload.id;

                return {
                    ...state,
                };
            },
            delete(state, {payload}) {
                remove(state.objectives, payload);
                return {
                    ...state,
                    objectives: [...state.objectives]
                };
            },
        }
    },
};
