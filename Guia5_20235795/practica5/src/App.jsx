import { BrowserRouter, Routes, Route } from "react-router"
import Layout from "./layout/Layout"
import IndexPage from "./pages/IndexPage"
import { FavoritesPage } from "./pages/FavoritesPage"


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<IndexPage/>} />
                    <Route path="/favoritos" element={<FavoritesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App