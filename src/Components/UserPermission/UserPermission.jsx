import React, { useState } from 'react';
import { Col, Row, Table } from 'reactstrap';

const PermissionsCheckboxList = ({ perms, updatePermissionStatus, update }) => {
    const [permissions, setPermissions] = useState(perms);

    const handleCheckboxChange = (permissionId, menuId) => {
        const updatedPermissions = permissions.map(permissionGroup => {
            if (permissionGroup.id === menuId) {
                return {
                    ...permissionGroup,
                    userPermission: permissionGroup.userPermission.map(permission => {
                        if (permission.permissionId === permissionId) {
                            return {
                                ...permission,
                                status: !permission.status
                            };
                        }
                        return permission;
                    })
                };
            }
            return permissionGroup;
        });

        setPermissions(updatedPermissions);
        update(updatedPermissions)
        updatePermissionStatus(permissionId, menuId);
    };

    return (
        <>
            <Table hover={true} className='table-border-horizontal table-light'>
                <thead>
                    <tr>
                        <th scope='col'>Sl.No</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Permission</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions?.map((permissionGroup, index) => (
                        <tr key={permissionGroup.id}>
                            <th scope='row'>{index + 1}</th>
                            <th scope='row'>{permissionGroup.title}</th>
                            <th scope='row'>
                                <Row>
                                    {permissionGroup.userPermission?.map(permission => (
                                        <Col md='3' key={permission.id}>
                                            <div key={permission.id}>
                                                <label className='cursor-pointer'>
                                                    <input
                                                        type="checkbox"
                                                        checked={permission.status}
                                                        onChange={() => handleCheckboxChange(permission.permissionId, permissionGroup.id)}
                                                    />
                                                    {permission.permission.name}
                                                </label>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
        // <div>
        //     {permissions.map(permissionGroup => (
        //         <div key={permissionGroup.id}>
        //             <Row>
        //                     {permissionGroup.userPermission.map(permission => (
        //                 <Col md='3'>
        //                         <div key={permission.id}>
        //                             <label>
        //                                 <input
        //                                     type="checkbox"
        //                                     checked={permission.status}
        //                                     onChange={() => handleCheckboxChange(permission.permissionId, permissionGroup.id)}
        //                                 />
        //                                 {permission.permission.name}
        //                             </label>
        //                         </div>
        //                 </Col>
        //                     ))}
        //             </Row>

        //         </div>
        //     ))}
        // </div>
    );
};

export default PermissionsCheckboxList;
