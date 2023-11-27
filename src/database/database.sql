-- Active: 1698449183579@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT (
            strftime(
                '%Y-%m-%d %H:%M:%S',
                'now',
                'localtime'
            )
        )
    );

DROP TABLE users 

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        'u001',
        'Carol',
        'carol@email.com',
        'carol123',
        'NORMAL'
    ), (
        'u002',
        'Breno',
        'breno@email.com',
        'breno123',
        'NORMAL'
    )

CREATE Table
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT UNIQUE NOT NULL,
        likes REAL NOT NULL,
        dislikes_numbers REAL NOT NULL,
        created_at DATETIME DEFAULT (
            strftime(
                '%Y-%m-%d %H:%M:%S',
                'now',
                'localtime'
            )
        ),
        updated_at DATETIME DEFAULT (
            strftime(
                '%Y-%m-%d %H:%M:%S',
                'now',
                'localtime'
            )
        )
    );
DROP TABLE posts

INSERT INTO
    posts(
        id,
        creator_id,
        content,
        likes,
        dislikes_numbers
    )
VALUES
('p001', 'u001', 'oiii', 5, 1),
('p002', 'u002', 'oi oi tudo bem', 4, 2);

SELECT * FROM users;
SELECT * FROM posts

CREATE TABLE
likes_dislikes(
    likes_dislikes_id PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like NUMBER  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    );

    DROP TABLE likes_dislikes;

SELECT * FROM likes_dislikes

    INSERT INTO likes_dislikes (likes_dislikes_id, user_id, post_id, like) 
    VALUES ('l001', 'u001','p001', 5),
    ('l002', 'u003','p002', 6)

    DELETE FROM likes_dislikes WHERE likes_dislikes_id LIKE '%l001%'