export const Token = process.env.REACT_APP_TOKEN;

export const config = {
  headers: {
    "content-type": "application/json",
    "X-API-KEY": `${Token}`
  }
};
