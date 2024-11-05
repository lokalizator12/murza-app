import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from '../axiosConfig';

const ItemSelection = ({ selectedItems = [], setSelectedItems, label }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/items-delivery');
                setItems(response.data); // Ожидается, что ответ содержит массив объектов {id, itemName}
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    // Обработчик выбора/отмены выбора предмета
    const handleItemClick = (itemId) => {
        setSelectedItems((prevSelected) => {
            const newSelection = prevSelected.includes(itemId)
                ? prevSelected.filter(id => id !== itemId) // Убираем, если элемент уже выбран
                : [...prevSelected, itemId]; // Добавляем, если элемент не выбран

            return newSelection;
        });
    };

    // Логируем изменения в списке selectedItems при каждом его обновлении
    useEffect(() => {
        console.log(`${label} список:`, selectedItems);
    }, [selectedItems]);

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" gutterBottom>{label}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {items.map((item) => (
                    <Button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        variant="contained"
                        sx={{
                            borderRadius: '20px',
                            minWidth: '100px',
                            padding: '8px 16px',
                            backgroundColor: selectedItems.includes(item.id) ? '#1976d2' : 'white', // primary.main for selected, white for unselected
                            color: selectedItems.includes(item.id) ? '#fff' : '#1976d2', // white text for selected, primary.main for unselected
                            border: selectedItems.includes(item.id) ? 'none' : '1px solid #1976d2',
                            transition: 'all 0.3s',
                            '&:hover': {
                                backgroundColor: selectedItems.includes(item.id) ? '#1565c0' : '#e3f2fd',
                                color: selectedItems.includes(item.id) ? '#fff' : '#1976d2',
                            },
                        }}
                    >
                        {item.itemName}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default ItemSelection;
