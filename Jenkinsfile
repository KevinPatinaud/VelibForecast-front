pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'npm ci  --legacy-peer-deps'
      }
    }

    stage('test') {
      steps {
        sh 'npm run test:ci'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('deploy') {
      steps {
        sh 'kill -9 `ps -ef | grep node | grep -v grep | awk \'{ print $2 }\'` &'
        sh 'rm -rf /var/NodeServer/velibforecast/build/'
        sh 'cp -r ${WORKSPACE}/build/ /var/NodeServer/velibforecast/build/'
      }
    }

    stage('restart') {
      steps {
        sh '''node /var/NodeServer/server.js &
'''
      }
    }

  }
}