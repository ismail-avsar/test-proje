import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export default function Success() {
    const history = useHistory();

    const handleBack = () => {
        history.push('/');
    };

    return (
        <div>
            <h2 id="success-title">Giriş Başarılı!</h2>
            <p id="success-message">Uygulamaya başarıyla giriş yaptınız.</p>
            <div>
                <Button color="primary" id="back-button" onClick={handleBack}>
                    Giriş Sayfasına Dön
                </Button>
            </div>
        </div>
    );
}
