"""Addes primary key to friend_requests table //FAIL

Revision ID: 70b8731ee518
Revises: b072827d2c3f
Create Date: 2023-09-13 23:51:40.328010

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '70b8731ee518'
down_revision: Union[str, None] = 'b072827d2c3f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
