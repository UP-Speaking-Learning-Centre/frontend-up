import React, { useState } from 'react';

const useEditNote = () => {
    const [isEdit, setIsEdit] = useState(false);
    return { isEdit, setIsEdit };
};

export default useEditNote;
