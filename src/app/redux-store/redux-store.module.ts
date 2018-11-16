import { TodoService } from './todo/todo.service';
import { TodoEpics } from './todo/todo.epic';
import { TodoActions } from './todo/todo.actions';
import { rootReducer } from './root.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { RootEpics } from './root.epic';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, NgReduxModule
  ],
  providers: [
    RootEpics,
    TodoActions,
    TodoEpics,
    TodoService,
  ]
})
export class ReduxStoreModule {

  constructor(
    public store: NgRedux<{}>,
    devTools: DevToolsExtension,
    rootEpics: RootEpics
  ) {
    const epicMiddleware = createEpicMiddleware();

    let middleware = [epicMiddleware];

    middleware = middleware.concat([createLogger()]);

    // Tell Redux about our reducers and epics. If the Redux DevTools
    // chrome extension is available in the browser, tell Redux about
    // it too.
    store.configureStore(
      rootReducer,
      // Empty Object is the initial state
      // Since this is a simple todo app there isn't any presetting needed
      {},
      middleware,
      devTools.isEnabled() ? [devTools.enhancer()] : []
    );

    epicMiddleware.run(rootEpics.createEpics());
  }
 }
