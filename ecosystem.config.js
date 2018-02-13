module.exports = {
    /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [
        {
            name: 'app',
            script: 'build/server.js',
            env: {
                COMMON_VARIABLE: 'true',
                NODE_ENV: 'production'
            }
        }
    ],

    /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
    deploy: {
        stage: {
            user: 'root',
            host: '',
            ref: 'origin/master',
            repo: '',
            path: '',
            'post-deploy': 'npm i && pm2 reload /root/workspace/react-redux-isomorphic-template/ecosystem.config.js',
            env: {
                NODE_ENV: 'production'
            }
        },
        production: {
            user: 'ubuntu',
            key: `${process.env.HOME}/Documents/ssh/react-redux-isomorphic-template.pem`,
            host: '',
            ref: 'origin/master',
            repo: '',
            path: '',
            'post-deploy': 'npm i && pm2 reload /home/ubuntu/workspace/react-redux-isomorphic-template/ecosystem.config.js',
            env: {
                NODE_ENV: 'production'
            }
        }
    }
};
