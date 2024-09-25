import {
    useEffect
} from 'react';
import './App.css';

function App() {
    useEffect(() => {
        logShopData();
    }, []);

    return (
        <div>Labukas
        </div>
    );

    async function logShopData() {
        // API EXAMPLE
        const response = await fetch('https://localhost:7091/api/Items');
        const data = await response.json();
        console.log('JSON Data:', data);
    }
}

export default App;