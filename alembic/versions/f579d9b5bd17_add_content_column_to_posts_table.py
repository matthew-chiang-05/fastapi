"""add content column to posts table

Revision ID: f579d9b5bd17
Revises: 00724d9929b5
Create Date: 2023-09-08 16:44:50.239963

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f579d9b5bd17'
down_revision: Union[str, None] = '00724d9929b5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('posts', sa.Column('content', sa.String(), nullable=False))
    pass


def downgrade() -> None:
    op.drop_column('posts', 'content')
    pass
