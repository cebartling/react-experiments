import logoDark from '~/assets/react.svg';
import logoLight from '~/assets/react.svg';

const alternativeText = 'Logo image';
const Header = () => {
    return (
        <header>
            <div className="flex flex-row p-4">
                <img
                    src={logoDark}
                    className="hidden dark:block h-10"
                    alt={alternativeText}
                />
                <img
                    src={logoLight}
                    className="block dark:hidden h-10"
                    alt={alternativeText}
                />
            </div>
        </header>
    );
};

export default Header;
