import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <>
            <h1 className={styles.root}>
                <span>😕</span>
                <br/>
                404 страница не найдена
            </h1>
        </>
    );
}

export default NotFoundBlock;