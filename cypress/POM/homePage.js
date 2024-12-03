import homeSelectors from '../fixtures/selectors/homeSelectors.json';

export const clickUpdateProfileImage = () => cy.get('h4').contains('Update Image').click();
export const clickDownloadProfileImage = () =>
  cy.get('button').contains('Download Profile Image').click();

export const homePage = {
  createPost: (postText) => {
    cy.get(homeSelectors.postTextArea).type(postText);
    cy.get(homeSelectors.createPostButton).click();
  },
  deletePost: () => {
    cy.get(homeSelectors.deletePostButton).click();
    cy.get(homeSelectors.confirmDeletePostButton).click();
  },
  deleteProfileImage: () => {
    clickUpdateProfileImage();
    cy.get(homeSelectors.removeProfilePhotoButton).click();
  },
  downloadProfilePicture: () => {
    clickUpdateProfileImage();
    clickDownloadProfileImage();
  },
  uploadProfileImage: (path) => {
    clickUpdateProfileImage();
    cy.get(homeSelectors.inputProfileImage).selectFile(path, {
      force: true,
    });
    cy.get(homeSelectors.saveProfileImageButton).click();
  },
};
