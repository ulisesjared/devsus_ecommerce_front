import { useMemo, useState } from "react";

const GalleryScreen = ({ visible }:{visible:boolean}) => {
  if (!visible) return null; // No se renderiza nada si 'show' es falso

  return (
    <div>
      Galeria
    </div>
  );
};

export default GalleryScreen;
