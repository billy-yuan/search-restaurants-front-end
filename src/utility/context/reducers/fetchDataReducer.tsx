export type FetchDataState = {
  shouldFetchData: boolean;
  fetchData: number;
};

export enum FETCH_DATA_ACTION_TYPE {
  FETCH_DATA,
  NO_FETCH_DATA,
}

export type FetchDataAction = {
  type: FETCH_DATA_ACTION_TYPE;
};

export const initialFetchDataState: FetchDataState = {
  shouldFetchData: false,
  fetchData: 0,
};

export function fetchDataReducer(
  state: FetchDataState,
  action: FetchDataAction
): FetchDataState {
  switch (action.type) {
    case FETCH_DATA_ACTION_TYPE.FETCH_DATA:
      return {
        ...state,
        shouldFetchData: true,
        fetchData: state.fetchData + 1,
      };

    case FETCH_DATA_ACTION_TYPE.NO_FETCH_DATA:
      return { ...state, shouldFetchData: false };

    default:
      throw new Error("Not valid action type");
  }
}
