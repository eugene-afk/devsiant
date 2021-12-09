import LoginContainer from '../containers/Login'
import BufferContainer from '../containers/Buffer'
import PasswordsManagerContainer from '../containers/PasswordsManager'
import FileManagerContainer from '../containers/FileManager'
import PasswordProjectItemContainer from '../containers/PasswordProjectItem'
import NotFoundContainer from  '../containers/404'

const routes = [
    {
        path: "/login",
        component: LoginContainer,
        title: "Login",
        needsAuth: false
    },

    {
        path: "/pwds/:id",
        component: PasswordProjectItemContainer,
        title: "Password Project Item",
        needsAuth: true
    },

    {
        path: "/pwds",
        component: PasswordsManagerContainer,
        title: "Passwords Manager",
        needsAuth: true
    },

    {
        path: "/filem",
        component: FileManagerContainer,
        title: "File Manager",
        needsAuth: true
    },
    {
        path: "/",
        component: BufferContainer,
        title: "Global Buffer",
        needsAuth: true,
        exact: true
    },
    {
        component: NotFoundContainer,
        title: "Not Found",
        // needsAuth: false,
    },
]

export default routes