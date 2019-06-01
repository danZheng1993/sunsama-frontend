import gql from 'graphql-tag';

export const Queries = {
  meQuery: gql`
    query {
      me {
        _id
        name
        email
        tasks {
          count
        }
      }
    }
  `,
  tasksQuery: gql`
    query ($date:String){
      tasks(time:$date) {
        count
        tasks {
          _id
          title
          description
          time
          checked
        }
      }
    }
  `
};
