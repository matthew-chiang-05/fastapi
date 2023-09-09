"""add user table

Revision ID: 7ffe0af670a0
Revises: f579d9b5bd17
Create Date: 2023-09-08 16:49:04.714666

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7ffe0af670a0'
down_revision: Union[str, None] = 'f579d9b5bd17'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users', 
                    sa.Column('id', sa.Integer(), nullable=False), 
                    sa.Column('email', sa.String(),nullable=False), 
                    sa.Column('password', sa.String(),nullable=False),
                    sa.Column('create_at', sa.TIMESTAMP(timezone=True), server_default=sa.text('now()'), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email')
                    )
    pass


def downgrade() -> None:
    op.drop_table('users')
    pass
