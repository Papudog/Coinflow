import { PropsWithChildren, StrictMode } from "react";
import CategoryProvider from "./category_provider";
import SheetProvider from "./sheet_provider";
import UserProvider from "./user_provider";
import TransactionProvider from "./transaction_provider";

export default function AppProviders({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <StrictMode>
      <UserProvider>
        <CategoryProvider>
          <TransactionProvider>
            <SheetProvider>
              {children}
            </SheetProvider>
          </TransactionProvider>
        </CategoryProvider>
      </UserProvider>
    </StrictMode>
  );
}
