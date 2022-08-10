import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

const App: React.FC = () => (
    <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" /> 
                        <Route path="/demo-desc" /> 
                        <Route path="/demo-sim" /> 
                        <Route path="/demo-sub" /> 
                    </Route>
                </Routes>
            </BrowserRouter>
    </div>
)

export default App;