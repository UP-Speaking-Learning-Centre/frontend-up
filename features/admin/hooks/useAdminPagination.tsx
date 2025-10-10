import React, { useState } from 'react';
import { useTeacherManagementStore } from '../stores/teacher';

const useAdminPagination = () => {
    const pagination = useTeacherManagementStore(s => s.pagination);
    const setPagination = useTeacherManagementStore(s => s.setPagination);

    return { pagination,setPagination };
};

export default useAdminPagination;
