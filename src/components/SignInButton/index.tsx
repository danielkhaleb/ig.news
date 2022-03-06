import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton() {
    const isUSerLoggedIn = false;
    const colorGitHubIcon =  isUSerLoggedIn ? '#eba417' : '#04d361'
    return (
        <button className={styles.signInButton} type="button">
            <FaGithub color={colorGitHubIcon} />
             {isUSerLoggedIn ? <>Allllou</> : <>Sign in with Github</>}
            <FiX className={styles.closeIcon} />
        </button>
    )
}