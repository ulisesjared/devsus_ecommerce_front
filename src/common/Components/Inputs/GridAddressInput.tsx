import { useState, useEffect, type FC } from 'react';
import { getIn, type FormikProps } from 'formik';
import type { ICustomer } from '../../Interfaces/CustomerInterface';
import GenericModal from '../Modals/GenericModal';
import GoogleAddressSearch from '../Maps/GoogleAddressSearch';
import { Icons } from '../../Constants/Icons';

type Props = {
    address_id: keyof ICustomer
    latitude_id: keyof ICustomer
    longitude_id: keyof ICustomer
    label: string
    formik: FormikProps<ICustomer>
};

const GridAddressInput: FC<Props> = ({
    address_id,
    latitude_id,
    longitude_id,
    label,
    formik,
}) => {

    const { values, setFieldValue, handleChange, handleBlur } = formik

    const [showModal, setShowModal] = useState(false);
    const [draft, setDraft] = useState(() => ({
        address: getIn(values, address_id),
        latitude: getIn(values, latitude_id),
        longitude: getIn(values, longitude_id),
    }));

    useEffect(() => {
        setDraft({
            address: getIn(values, address_id),
            latitude: getIn(values, latitude_id),
            longitude: getIn(values, longitude_id),
        });
    }, [values, address_id, latitude_id, longitude_id]);

    const handleSave = () => {
        setFieldValue(address_id, draft.address);
        setFieldValue(latitude_id, draft.latitude);
        setFieldValue(longitude_id, draft.longitude);
        setShowModal(false);
    };

    return (
        <>
            <GenericModal
                visible={showModal}
                close={() => setShowModal(false)}
                title="Editar Dirección"
                actions={[
                    { label: 'Cancelar', onClick: () => setShowModal(false) },
                    { label: 'Guardar', onClick: handleSave, style: 'action' },
                ]}
                content={
                    <div className="h-[80vh] w-[80vw] flex py-2">
                        <GoogleAddressSearch
                            initLocation={{
                                lat: Number(draft.latitude),
                                lng: Number(draft.longitude),
                            }}
                            onLocationChange={(loc) =>
                                setDraft({
                                    address: loc.address,
                                    latitude: loc.latitude,
                                    longitude: loc.longitude,
                                })
                            }
                        />
                    </div>
                }
            />

            <label htmlFor={address_id as string} className="text-sm text-gray-800 text-end">
                {label}
            </label>
            <div className="w-full flex items-center gap-2">
                <textarea
                    className="fancy-scroll base-textarea flex-1"
                    id={address_id as string}
                    name={address_id as string}
                    rows={3}
                    value={getIn(values, address_id)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <button
                    type="button"
                    className="btn-primary size-10 total-center"
                    onClick={() => setShowModal(true)}
                >
                    <Icons.Edit size="20px" />
                </button>
            </div>
        </>
    );
};

export default GridAddressInput;
