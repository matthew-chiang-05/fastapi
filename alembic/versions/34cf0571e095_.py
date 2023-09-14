"""

Revision ID: 34cf0571e095
Revises: a8d6ef098f4a
Create Date: 2023-09-13 22:11:16.501053

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '34cf0571e095'
down_revision: Union[str, None] = 'a8d6ef098f4a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table('friend_requests',
                    sa.Column('user_request_id', sa.Integer(), nullable=False),
                    sa.Column('user_recieve_id', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('user_request_id', 'user_recieve_id')
                    )
    op.create_foreign_key('friends_users_request_fk', source_table='friend_requests', referent_table='users',local_cols=['user_request_id'],remote_cols=['id'], ondelete='CASCADE')
    op.create_foreign_key('friends_users_recieve_fk', source_table='friend_requests', referent_table='users', local_cols=['user_recieve_id'],remote_cols=['id'], ondelete='CASCADE')
    
    """
    op.create_table('friends',
                    sa.Column('user_one', sa.Integer(), nullable=False),
                    sa.Column('user_two', sa.Integer(), nullable=False)
                    )
    op.create_foreign_key('friends_users_request_fk', source_table='friends', referent_table='users',local_cols=['user_one'],remote_cols=['id'], ondelete='CASCADE')
    op.create_foreign_key('friends_users_recieve_fk', source_table='friends', referent_table='users', local_cols=['user_two'],remote_cols=['id'], ondelete='CASCADE')
    pass
    """


def downgrade() -> None:
    """
    op.drop_constraint('friends_users_request_fk', table_name='friends')
    op.drop_constraint('friends_users_recieve_fk', table_name='friends')
    op.drop_table('friends')
    """
    op.drop_constraint('friends_users_request_fk', table_name='friend_requests')
    op.drop_constraint('friends_users_recieve_fk', table_name='friend_requests')
    op.drop_table('friend_requests')
    pass
