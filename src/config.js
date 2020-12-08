const hostApi = process.env.NODE_ENV === "development" ? "http://localhost" : "http://mindlyftestadmin.antimtechnologies.com";
const portApi = process.env.NODE_ENV === "development" ? 8080 : 8001;
const baseURLApi = `${hostApi}${portApi ? `:${portApi}/api/` : `${portApi}/api/`}`;

export default {
  hostApi,
  portApi,
  baseURLApi,
  remote: "mindlyftestadmin.antimtechnologies.com/api/",
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: 'admin@gmail.com',
    password: 'password'
  },
  app: {
    colors: {
      dark: "#323232",
      light: "#FFFFFF",
    },
    themeColors: {
      warning: '#FEBE69',
      danger: '#FF7769',
      success: '#81D4BB',
      info: '#4DC7DF'
    }
  }
};
