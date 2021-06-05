<?php

namespace App\Repository;

use App\Entity\TurnosPredefinidos;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TurnosPredefinidos|null find($id, $lockMode = null, $lockVersion = null)
 * @method TurnosPredefinidos|null findOneBy(array $criteria, array $orderBy = null)
 * @method TurnosPredefinidos[]    findAll()
 * @method TurnosPredefinidos[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TurnosPredefinidosRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TurnosPredefinidos::class);
    }

    // /**
    //  * @return TurnosPredefinidos[] Returns an array of TurnosPredefinidos objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TurnosPredefinidos
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
