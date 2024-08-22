pipeline {
   agent {
           docker {
             image 'papesambandour/docker-node-alpine-16-git:1.1'
             args '-u root:root'
           }
       }

    stages {
        stage('Install caprover CLI'){
          steps{
             echo "START INSTALL CAPROVER CLI"
             sh 'npm install -g caprover'
             echo "END INSTALL CAPROVER CLI"
          }
        }

        stage('Deployment INTECH API SERVICE') {
            steps {
                echo 'Start deploy'
                sh 'caprover deploy -h ${CAPTAIN_URL} -p ${PASSWORD_CAPROVER} -b $GIT_BRANCH -a  manueluniv-whatsapp'
                echo 'END DEPLOY $GIT_BRANCH'
            }
        }


    }
}
