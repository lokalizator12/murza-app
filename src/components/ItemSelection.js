import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from '../axiosConfig';

const ItemSelection = ({ selectedItems = [], setSelectedItems }) => {
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
            if (Array.isArray(prevSelected)) {
                // Проверяем, если элемент уже выбран, убираем его
                if (prevSelected.includes(itemId)) {
                    return prevSelected.filter(id => id !== itemId);
                } else {
                    // Если элемент не выбран, добавляем его
                    return [...prevSelected, itemId];
                }
            } else {
                console.error("selectedItems не является массивом:", prevSelected);
                return [];
            }
        });
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" gutterBottom>Выберите предметы</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {items.map((item) => (
                    <Button
                        key={item.id}
                        variant={Array.isArray(selectedItems) && selectedItems.includes(item.id) ? 'contained' : 'outlined'}
                        color={Array.isArray(selectedItems) && selectedItems.includes(item.id) ? 'primary' : 'default'}
                        onClick={() => handleItemClick(item.id)}
                        sx={{
                            borderRadius: '20px',
                            minWidth: '100px',
                            padding: '8px 16px',
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
