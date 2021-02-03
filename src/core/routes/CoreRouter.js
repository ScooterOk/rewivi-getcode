import { Switch, Route } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

const CoreRouter = ({ children, setAuthToken }) => {
  return (
    <Switch>
      {children}
      <Route component={NotFound} />
    </Switch>
  );
};

export default CoreRouter;
