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
    namespace: 'okr/home/comment',
    state: {
        submitting: false,
        comments: []
    },
    scoped: {
        reducers: {
            create(state, {payload}) {
                payload.id = `comment-${uuidv4()}`;
                payload.created_time = genCreatedTime();
                payload.author = "David Zhu";
                payload.avatar = `${process.env.BASE_URL}/okr/images/zhu.png`;
                // payload.value
                return {
                    ...state,
                    comments: [...state.comments, payload]
                };
            },

        }
    },
};
