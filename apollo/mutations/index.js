import gql from 'graphql-tag';

export const Mutations = {
  userAddMutation: gql`
    mutation($name:String!, $email:String!, $password:String!) {
      userAdd(name:$name, email:$email, password:$password){
        token
      }
    }
  `,
  loginMutation: gql`
    mutation($email:String!, $password:String!) {
      login(email:$email, password:$password){
        token
      }
    }
  `,
  taskAddMutation: gql`
    mutation ($title:String!, $description:String!, $time:String!) {
      taskAdd(title:$title, description:$description, time:$time) {
        _id
        title
        description
        time
        user {
          _id
          email
        }
      }
    }
  `,
  taskUpdateMutation: gql`
    mutation ($id:ID!, $title:String, $description:String, $time:String, $checked: Boolean) {
      taskUpdate( id:$id, title:$title, description:$description, time:$time, checked:$checked) {
        _id
        title
        description
        time
        checked
        user {
          _id
          email
        }
      }
    }
  `,
  taskDeleteMutation: gql`
    mutation($id:ID!) {
      taskDelete(id:$id)
    }
  `,
};
