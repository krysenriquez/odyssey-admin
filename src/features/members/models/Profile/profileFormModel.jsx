export default {
  formId: 'profileForm',
  formField: {
    avatarInfo: {
      fileName: {
        key: 'fileName',
        name: 'avatarInfo.fileName',
      },
      fileAttachment: {
        key: 'fileAttachment',
        name: 'avatarInfo.fileAttachment',
      },
    },
    personalInfo: {
      birthdate: {
        key: 'birthdate',
        name: 'personalInfo.birthdate',
        label: 'Birthdate',
        requiredErrorMsg: 'Birthdate is required',
      },
      gender: {
        key: 'gender',
        name: 'personalInfo.gender',
        label: 'Gender',
        requiredErrorMsg: 'Gender is required',
      },
    },
    contactInfo: {
      contactNumber: {
        key: 'contactNumber',
        name: 'contactInfo.contactNumber',
        label: 'Contact Number',
        requiredErrorMsg: 'Contact Number is required',
      },
    },
    addressInfo: {
      street: {
        key: 'street',
        name: 'addressInfo.street',
        label: 'Street',
      },
      city: {
        key: 'city',
        name: 'addressInfo.city',
        label: 'City',
        requiredErrorMsg: 'City is required',
      },
      state: {
        key: 'state',
        name: 'addressInfo.state',
        label: 'Province/Region',
        requiredErrorMsg: 'Province is required',
      },
    },
    user: {
      username: {
        key: 'username',
        name: 'user.username',
        label: 'Username',
        min: 8,
        max: 20,
        requiredErrorMsg: 'Username is required',
      },
      emailAddress: {
        key: 'emailAddress',
        name: 'user.emailAddress',
        label: 'Email Address',
        requiredErrorMsg: 'Email Address is required',
        invalidErrorMsg: 'Invalid Email format',
      },
      adminPassword: {
        key: 'adminPassword',
        name: 'user.adminPassword',
        label: 'Admin Password',
        requiredErrorMsg: 'Admin Password is required',
      },
      newPassword: {
        key: 'newPassword',
        name: 'user.newPassword',
        label: 'New Password',
        requiredErrorMsg: 'New Password is required',
      },
      confirmNewPassword: {
        key: 'confirmNewPassword',
        name: 'user.confirmNewPassword',
        label: 'Confirm New Password',
        requiredErrorMsg: 'Confirm New Password is required',
        invalidErrorMsg: 'Passwords must match',
      },
    },
  },
}
