import React, { useState } from 'react';
import '../pages/Main-Form/CreateRouteForm.css'

const ParcelRequestPageTwo = ({ formData, setFormData, nextStep, prevStep }) => {
    const [photos, setPhotos] = useState(formData.photos || []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(files);
        setFormData((prevData) => ({ ...prevData, photos: files }));
    };

    return (
        <div className="create-route-form">
            <h2 className="form-title">Parcel Details</h2>

            <label className="input-group">
                Declaration:
                <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration || false}
                    onChange={(e) => setFormData((prevData) => ({ ...prevData, declaration: e.target.checked }))}
                />
            </label>

            <label className="input-group">
                Weight (kg):
                <input
                    type="number"
                    name="weight"
                    value={formData.weight || ''}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label className="input-group">
                Volume (m³):
                <input
                    type="number"
                    name="volume"
                    value={formData.volume || ''}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <div className="input-group">
                <label>Dimensions (cm):</label>
                <div className="dimension-fields">
                    <input
                        type="number"
                        name="height"
                        placeholder="Height"
                        value={formData.height || ''}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="width"
                        placeholder="Width"
                        value={formData.width || ''}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="length"
                        placeholder="Length"
                        value={formData.length || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            <label className="input-group">
                Photos:
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </label>

            <div className="photo-preview">
                {photos.map((photo, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        style={{ width: '100px', height: '100px', margin: '5px', borderRadius: '8px' }}
                    />
                ))}
            </div>

            <div className="wizard-footer">
                <button className="back-button" onClick={prevStep}>Back</button>
                <button className="next-button" onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default ParcelRequestPageTwo;
