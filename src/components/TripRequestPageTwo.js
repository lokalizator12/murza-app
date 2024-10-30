import React from 'react';
import '../pages/Main-Form/CreateRouteForm.css'

const TripRequestPageTwo = ({ formData, setFormData, nextStep, prevStep }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="create-route-form">
            <h2 className="form-title">Trip Restrictions</h2>

            <label className="input-group">
                Declaration Required:
                <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration || false}
                    onChange={(e) => setFormData((prevData) => ({ ...prevData, declaration: e.target.checked }))}
                />
            </label>

            <label className="input-group">
                Max Weight (kg):
                <input
                    type="number"
                    name="maxWeight"
                    value={formData.maxWeight || ''}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label className="input-group">
                Max Volume (m³):
                <input
                    type="number"
                    name="maxVolume"
                    value={formData.maxVolume || ''}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <div className="input-group">
                <label>Max Dimensions (cm):</label>
                <div className="dimension-fields">
                    <input
                        type="number"
                        name="maxHeight"
                        placeholder="Max Height"
                        value={formData.maxHeight || ''}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="maxWidth"
                        placeholder="Max Width"
                        value={formData.maxWidth || ''}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="maxLength"
                        placeholder="Max Length"
                        value={formData.maxLength || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <label className="input-group">
                Accepted Items (IDs):
                <input
                    type="text"
                    name="acceptedItemsId"
                    value={formData.acceptedItemsId || ''}
                    onChange={handleInputChange}
                    placeholder="Enter comma-separated IDs"
                />
            </label>

            <label className="input-group">
                Declined Items (IDs):
                <input
                    type="text"
                    name="declinedItemsId"
                    value={formData.declinedItemsId || ''}
                    onChange={handleInputChange}
                    placeholder="Enter comma-separated IDs"
                />
            </label>

            <div className="wizard-footer">
                <button className="back-button" onClick={prevStep}>Back</button>
                <button className="next-button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default TripRequestPageTwo;
