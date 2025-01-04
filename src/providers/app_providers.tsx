import { PropsWithChildren } from "react";
import CategoryProvider from "./category_provider";
import SheetProvider from "./sheet_provider";
import UserProvider from "./user_provider";

export default function AppProviders({
  children,
}: PropsWithChildren): React.JSX.Element {
  return (
    <UserProvider>
      <CategoryProvider>
        <SheetProvider>{children}</SheetProvider>
      </CategoryProvider>
    </UserProvider>
  );
}
