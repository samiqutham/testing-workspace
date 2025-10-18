module.exports = {
  apps: [
    {
      name: "stakefair",
      script: "pnpm",
      args: "start:stakefair",
      cwd: "./",
    },
    {
      name: "casino_s",
      script: "pnpm",
      args: "start:casino_s",
      cwd: "./",
    },
    {
      name: "exchange_s",
      script: "pnpm",
      args: "start:exchange_s",
      cwd: "./",
    },
    {
      name: "fantasy_s",
      script: "pnpm",
      args: "start:fantasy_s",
      cwd: "./",
    },
    {
      name: "sportsbook_s",
      script: "pnpm",
      args: "start:sportsbook_s",
      cwd: "./",
    }
  ]
};
