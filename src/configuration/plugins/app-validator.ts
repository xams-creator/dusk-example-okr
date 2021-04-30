import Dusk from '@xams-framework/dusk';

function isLoggedIn() {
    return !!localStorage.getItem('access_token');
}

export default function createValidator(options?: any) {
    return () => {
        return {
            name: 'app-login-validator',
            onLaunch({_history: history}: Dusk, next) {
                if (!isLoggedIn()) {
                    history.push('/user/login');
                }
                if (history.location.pathname === '/') {
                    history.push('/okr/home/basic?code=xams');
                }
                next();
            }
        };
    };
};
