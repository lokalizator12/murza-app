import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Button, Alert } from '@mui/material';
import axios from '../../axiosConfig';

const TripStep2 = ({ formData, handleChange, setIsNextEnabled }) => {
    const [items, setItems] = useState([]);
    const [acceptedItems, setAcceptedItems] = useState([]);
    const [declinedItems, setDeclinedItems] = useState([]);
    const [showVolumeAlert, setShowVolumeAlert] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    // Получаем список всех предметов при загрузке
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/items-delivery');
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    // Обработчики добавления/удаления предметов
    const handleAcceptItem = useCallback((item) => {
        setAcceptedItems((prev) =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
        setDeclinedItems((prev) => prev.filter(i => i !== item));
    }, []);

    const handleDeclineItem = useCallback((item) => {
        setDeclinedItems((prev) =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
        setAcceptedItems((prev) => prev.filter(i => i !== item));
    }, []);

    // Обновление состояния formData только при реальном изменении acceptedItems или declinedItems
    useEffect(() => {
        const newAcceptedItems = acceptedItems.map(item => item.id);
        const newDeclinedItems = declinedItems.map(item => item.id);

        if (
            JSON.stringify(newAcceptedItems) !== JSON.stringify(formData.acceptedItemsId) ||
            JSON.stringify(newDeclinedItems) !== JSON.stringify(formData.declinedItemsId)
        ) {
            handleChange('acceptedItemsId', newAcceptedItems);
            handleChange('declinedItemsId', newDeclinedItems);
            console.log("Принятые предметы:", acceptedItems);
            console.log("Отклоненные предметы:", declinedItems);
        }
    }, [acceptedItems, declinedItems, formData, handleChange]);

    // Валидация полей
    const validateFields = () => {
        const errors = {};
        if (!formData.maxWeight || formData.maxWeight <= 0) errors.maxWeight = "Масса должна быть положительным числом";
        if (!formData.maxVolume || formData.maxVolume <= 0) errors.maxVolume = "Объем должен быть положительным числом";
        if (!formData.maxLength || formData.maxLength <= 0) errors.maxLength = "Длина должна быть положительным числом";
        if (!formData.maxWidth || formData.maxWidth <= 0) errors.maxWidth = "Ширина должна быть положительным числом";
        if (!formData.maxHeight || formData.maxHeight <= 0) errors.maxHeight = "Высота должна быть положительным числом";

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // Проверяем валидацию для активации кнопки "Next"
    useEffect(() => {
        const isFormValid = validateFields();
        setIsNextEnabled(isFormValid && (acceptedItems.length > 0 || declinedItems.length > 0));
    }, [formData, acceptedItems, declinedItems, setIsNextEnabled]);

    // Обработчик для обновления размеров и расчета объема
    const handleDimensionChange = (field, value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue >= 0) {
            handleChange(field, numericValue);

            // Вычисляем объем, если заданы все три размера
            const { maxLength = 0, maxWidth = 0, maxHeight = 0 } = formData;
            const updatedDimensions = {
                ...formData,
                [field]: numericValue
            };
            const calculatedVolume = updatedDimensions.maxLength * updatedDimensions.maxWidth * updatedDimensions.maxHeight;

            // Если рассчитанный объем больше, чем текущий указанный "Максимальный объем", обновляем его
            if (calculatedVolume > formData.maxVolume) {
                handleChange('maxVolume', calculatedVolume);
                setShowVolumeAlert(true); // Показываем алерт
            } else {
                setShowVolumeAlert(false); // Скрываем алерт, если объем не превышен
            }
        } else {
            handleChange(field, ''); // Если значение пустое
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" gutterBottom>
                Шаг 2: Параметры груза и предметы
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange('declaration', e.target.checked)}
                    />
                }
                label="Еду через красный коридор (декларация)"
            />

            <TextField
                label="Максимальная масса (кг)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.maxWeight || ''}
                onChange={(e) => handleChange('maxWeight', parseFloat(e.target.value) || '')}
                error={!!validationErrors.maxWeight}
                helperText={validationErrors.maxWeight}
            />

            <TextField
                label="Максимальный объем (м³)"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.maxVolume || ''}
                onChange={(e) => handleChange('maxVolume', parseFloat(e.target.value) || '')}
                error={!!validationErrors.maxVolume}
                helperText={validationErrors.maxVolume}
            />

            {showVolumeAlert && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Объем был автоматически пересчитан на основе введенных размеров.
                </Alert>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <TextField
                    label="Макс. длина"
                    type="number"
                    variant="outlined"
                    value={formData.maxLength || ''}
                    onChange={(e) => handleDimensionChange('maxLength', e.target.value)}
                    error={!!validationErrors.maxLength}
                    helperText={validationErrors.maxLength}
                />
                <TextField
                    label="Макс. ширина"
                    type="number"
                    variant="outlined"
                    value={formData.maxWidth || ''}
                    onChange={(e) => handleDimensionChange('maxWidth', e.target.value)}
                    error={!!validationErrors.maxWidth}
                    helperText={validationErrors.maxWidth}
                />
                <TextField
                    label="Макс. высота"
                    type="number"
                    variant="outlined"
                    value={formData.maxHeight || ''}
                    onChange={(e) => handleDimensionChange('maxHeight', e.target.value)}
                    error={!!validationErrors.maxHeight}
                    helperText={validationErrors.maxHeight}
                />
            </Box>

            <Typography variant="h6" sx={{ mt: 4 }}>
                Выберите предметы для перевозки
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">Принятые предметы</Typography>
                    {items.map((item) => (
                        <Button
                            key={`accept-${item.id}`}
                            onClick={() => handleAcceptItem(item)}
                            variant={acceptedItems.includes(item) ? 'contained' : 'outlined'}
                            color={acceptedItems.includes(item) ? 'primary' : 'default'}
                            sx={{
                                m: 1,
                                minWidth: '100px',
                                backgroundColor: acceptedItems.includes(item) ? 'primary.main' : 'transparent',
                                color: acceptedItems.includes(item) ? '#fff' : 'text.primary',
                                borderRadius: '20px'
                            }}
                        >
                            {item.itemName}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">Отклоненные предметы</Typography>
                    {items.map((item) => (
                        <Button
                            key={`decline-${item.id}`}
                            onClick={() => handleDeclineItem(item)}
                            variant={declinedItems.includes(item) ? 'contained' : 'outlined'}
                            color={declinedItems.includes(item) ? 'secondary' : 'default'}
                            sx={{
                                m: 1,
                                minWidth: '100px',
                                backgroundColor: declinedItems.includes(item) ? 'secondary.main' : 'transparent',
                                color: declinedItems.includes(item) ? '#fff' : 'text.primary',
                                borderRadius: '20px'
                            }}
                        >
                            {item.itemName}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default TripStep2;
