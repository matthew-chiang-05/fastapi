"""Add friends table // TEST 2

Revision ID: b072827d2c3f
Revises: b2d12273e267
Create Date: 2023-09-13 23:24:22.734552

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b072827d2c3f'
down_revision: Union[str, None] = 'b2d12273e267'
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
