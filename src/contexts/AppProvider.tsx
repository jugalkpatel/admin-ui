import { useReducer, useEffect } from "react";
import { status } from "@/lib/utils";
import { createContext, useContext } from "react";
import { fetchMembers } from "@/api";

export type Member = {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
};

export type STATUS = keyof typeof status;

export type APP_STATE = {
  data: Array<Member>;
  status: STATUS;
  error: string | null;
  dispatch: React.Dispatch<ACTION_TYPE>;
};

export const AppContext = createContext<APP_STATE | null>(null);

export const useAppContext = () => {
  const currentUserContext = useContext(AppContext);

  if (!currentUserContext) {
    throw new Error(
      "useAppContext has to be used within <AppProvider.Provider>"
    );
  }

  return currentUserContext;
};

export type State = {
  data: Array<Member>;
  status: STATUS;
  error: string | null;
};

export type ACTION_TYPE =
  | { type: typeof status.SUCCESS; payload: Array<Member> }
  | { type: typeof status.ERROR; error: string }
  | { type: typeof status.LOADING }
  | { type: typeof status.RESET }
  | { type: typeof status.DELETE_ROW; payload: Array<string> }
  | { type: typeof status.UPDATE_ROW; payload: Member };

const initialState: State = {
  data: [],
  error: null,
  status: "IDLE",
};

const reducer = (state: typeof initialState, action: ACTION_TYPE): State => {
  switch (action.type) {
    case status.LOADING:
      return { ...state, status: status.LOADING };
    case status.SUCCESS:
      return { ...state, status: status.SUCCESS, data: action.payload };
    case status.ERROR:
      return { ...state, status: status.ERROR, error: action.error };
    case status.UPDATE_ROW: {
      const { id, ...rest } = action.payload;
      return {
        ...state,
        data: state.data.map((row) => {
          if (row.id === id) {
            return { ...row, ...rest };
          }
          return row;
        }),
      };
    }
    case status.DELETE_ROW: {
      const ids = action.payload;
      return {
        ...state,
        data: state.data.filter((row) => !ids.includes(row.id)),
      };
    }
    case status.RESET:
      return initialState;
    default:
      throw new Error("action not available");
  }
};

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: status.LOADING });
    fetchMembers()
      .then((data) => {
        dispatch({ type: status.SUCCESS, payload: data });
      })
      .catch(() => {
        dispatch({ type: status.ERROR, error: "something went wrong!" });
      });
  }, []);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
