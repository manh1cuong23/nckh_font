import useAuthStore from '~/hooks/useAuthStore';
import { Navigate } from 'react-router-dom';

function AuthComposition(Component) {
    console.log('h',Component)
    const user = useAuthStore((state) => state.user);
    console.log('checl ',user)
    return function (props) {

        if (true) {
            return <Navigate to={'/login'} />;
        }

        return <Component {...props} />;
    };
}

export default AuthComposition;
